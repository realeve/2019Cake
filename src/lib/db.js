import { axios } from './axios';

/**
 *   @database: { 微信开发 }
 *   @desc:     { 更新url阅读数 }
 */
export const addCommonVisitCount = async (url) =>
  await axios({
    url: '/5/4c908bffac.json',
    params: {
      url
    }
  }).then((res) => res);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 部门列表 }
 */
export const getCbpcDeptList = async (sid) =>
  await axios({
    url: '/7/809d780efa/array.json',
    params: {
      sid,
      cache: 7200
    }
  }).then((res) => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 用户登录 } 
    const { sid, card_no, username,dept_name } = params;
*/
export const login = async (params) =>
  await axios({
    url: '/8/230cba0823.json',
    params
  }).then((res) => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 用户登录(累计积分模式) } 
    const { sid, card_no, username, dept_name } = params;
*/
export const login2 = async (params) =>
  await axios({
    url: '/39/836f66bd88.json',
    params
  }).then((res) => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 用户登录信息查询 } 
    const { card_no, user_name } = params;
*/
export const getViewCbpcUserList = async (params) =>
  await axios({
    url: '/41/bdcb547de9.json',
    params
  }).then((res) => res);

/**
 *   @database: { 微信开发 }
 *   @desc:     { 部门列表 }
 */
export const getCbpcDepts = async (sid) =>
  await axios({
    url: '/42/a7290ee4fd.json',
    params: {
      sid
    }
  }).then((res) => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 卡号改部门 } 
    const { dept_id, card_no } = params;
*/
export const updateDeptInfo = async (params) =>
  await axios({
    url: '/43/0265840c3d.json',
    params
  }).then((res) => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 姓名及部门改卡号 } 
    const { card_no, username, dept_id } = params;
*/
export const updateCardInfo = async (params) =>
  await axios({
    url: '/44/ebe393408a.json',
    params
  }).then((res) => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 新增人员信息 } 
    const { card_no, user_name, dept_id } = params;
*/
export const addCbpcUserList = async (params) =>
  await axios({
    url: '/45/7a5fa288f5.json',
    params
  }).then((res) => res);

/**
*   @database: { 微信开发 }
*   @desc:     { 根据Uid更新微信身份信息 } 
    const { nickname, headimgurl, sex, openid, uid } = params;
*/
export const setCbpcUserList = (params) =>
  axios({
    url: '/15/791c1677d6.json',
    params
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 工会_慰问品套餐列表 }
 */
export const getCbpcCakeList = () =>
  axios({
    url: '/174/4cdca1edc7.json'
  });

/**
*   @database: { 微信开发 }
*   @desc:     { 提交选择项 } 
    const { uid, cake_id } = params;
*/
export const addCbpcCakeMain = (params) =>
  axios({
    url: '/159/d37841e07f.json',
    params
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 是否已选择 }
 */
export const getCbpcCakeMain = (uid) =>
  axios({
    url: '/160/6209769039.json',
    params: {
      uid
    }
  });

/**
*   @database: { 微信开发 }
*   @desc:     { 更新选择项 } 
    const { cake_id, uid } = params;
*/
export const setCbpcCakeMain = (params) =>
  axios({
    url: '/161/b6fdf7f34b.json',
    params
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 是否参与调查 }
 */
export const getCbpcCakeVote = (uid) =>
  axios({
    url: '/164/459f55d167.json',
    params: {
      uid
    }
  });

/**
 *   @database: { 微信开发 }
 *   @desc:     { 投票结果 }
 */
export const getCbpcCakeVoteList = () =>
  axios({
    url: '/165/e4f9d0dc86.json'
  });

/**
*   @database: { 微信开发 }
*   @desc:     { 蛋糕券调查 } 
    const { uid, vote_id, remark } = params;
*/
export const addCbpcCakeVote = (params) =>
  axios({
    url: '/162/e17b1b8f9f.json',
    params
  });

/**
*   @database: { 微信开发 }
*   @desc:     { 更新调查结果 } 
    const { vote_id, remark, uid } = params;
*/
export const setCbpcCakeVote = (params) =>
  axios({
    url: '/163/62b9724f2d.json',
    params
  });

/**
*   @database: { 微信开发 }
*   @desc:     { 慰问品发放登录 } 
    const { username, usercard } = params;
*/
export const getCbpcCake = (params) =>
  axios({
    url: '/171/f9e3a3e108.json',
    params
  });
