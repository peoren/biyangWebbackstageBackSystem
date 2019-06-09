import mutations from './account/mutations';


const state = {
  num:[1,2,3],
  logined: '',
  showLoading:false,
}

 



export default {
  namespaced: true,
  state,
  mutations
}