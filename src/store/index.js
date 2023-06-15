import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import db from "../firebase/firebaseInit";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sampleBlogCards: [
      { blogTitle: "Blog Card #1", blogCoverPhoto: "stock-1", blogDate: "November 2, 2022" },
      { blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "November 2, 2022" },
      { blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "November 2, 2022" },
      { blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "November 2, 2022" },
    ],
    blogPosts: [],
    postLoaded: null,
    blogHTML: "Write your blog title here ...",
    blogTitle: "",
    blogPhotoName: "",
    blogPhotoFileURL: null,
    blogPhotoPreview: null,
    editPost: null,
    user: null,
    superUser: false,
    profileAdmin: null,
    profileEmail: null,
    profilFistName: null,
    profilLastName: null,
    profilUsername: null,
    profileId: null,
    profileInitials: null,
  },
  getters: {
    blogPostFeed(state) {
      return state.blogPosts.slice(0, 2);
    },
    blogPostCards(state) {
      return state.blogPosts.slice(0, 4);
    },
  },
  mutations: {
    newBlogPost(state, payload) {
      state.blogHTML = payload;
    },
    updateBlogTitle(state, payload) {
      state.blogTitle = payload;
    },
    fileNameChange(state, payload) {
      state.blogPhotoName = payload;
    },
    createFileUrl(state, payload) {
      state.blogPhotoFileURL = payload;
    },
    openPhotoPreview(state) {
      state.blogPhotoPreview = !state.blogPhotoPreview;
    },
    toggleEditPost(state, payload) {
      state.editPost = payload;
    },
    setBlogState(state, payload) {
      state.blogTitle = payload.blogTitle
      state.blogHTML = payload.blogHTML;
      state.blogPhotoFileURL = payload.blogCoverPhoto;
      state.blogPhotoName = payload.blogCoverPhotoName;
    },
    filterBlogPost(state, payload) {
      state.blogPosts = state.blogPosts.filter((post) => post.blogID !== payload);
    },
    updateUser(state, payload){
      state.user = payload;
    },
    setProfilAdmin(state, payload){
      state.profileAdmin = payload;
    },
    setProfilInfo(state, doc){
      state.profileId = doc.id;
      state.profileEmail = doc.data().email;
      state.profilFistName = doc.data().firstName;
      state.profilLastName = doc.data().lastName;
      state.profilUsername = doc.data().userName;
    },
    setProfileInitials(state){
      state.profileInitials = 
        state.profilLastName.match(/(\b\S)?/g).join("") + state.profilFistName.match(/(\b\S)?/g).join("");
    },
    changeFirstName(state, payload) {
      state.profilFistName = payload;
    },
    changeLastName(state, payload) {
      state.profilLastName = payload;
    },
    changeUsername(state, payload) {
      state.profilUsername = payload;
    },
    
  },
  actions: {
    async getCurrentUser({ commit }, user){
      const dataBase = await db.collection("users").doc(firebase.auth().currentUser.uid);
      const dbRsult = await dataBase.get();
      commit("setProfilInfo", dbRsult);
      commit("setProfileInitials");
      const token = await user.getIdTokenResult();
      const admin = await token.claims.admin;
      commit('setProfilAdmin',admin);
    },
    async getPost({ state }) {
      const dataBase = await db.collection("blogPosts").orderBy("date","desc");
      const dbResult = await dataBase.get();
      dbResult.forEach((doc) => {
        if (!state.blogPosts.some((post) => post.blogID === doc.id)) {
          const data = {
            blogID: doc.data().blogID,
            blogTitle: doc.data().blogTitle,
            blogHTML: doc.data().blogHTML,
            blogCoverPhoto: doc.data().blogCoverPhoto,
            blogDate: doc.data().date,
            blogCoverPhotoName: doc.data().blogCoverPhotoName,

          };
          
          state.blogPosts.push(data);
        }
      });
      state.postLoaded = true;
    },
    async deletePost({commit}, payload) {
      const getPost = await db.collection("blogPosts").doc(payload);
      await getPost.delete();
      commit("filterBlogPost", payload);
    },
    async updatePost({commit, dispatch}, payload) {
      commit("filterBlogPost", payload);
      await dispatch("getPost");
    },
    async updateUserSettings({commit,state}) {
      const dataBase = await db.collection('users').doc(state.profileId);
      await dataBase.update({
        firstName: state.profilFistName,
        lastName: state.profilLastName,
        userName: state.profilUsername,
      });
      commit("setProfileInitials");
    },
  },
  modules: {
  }
})
