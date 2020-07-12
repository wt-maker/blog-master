const { httpRequest } = require('./httpRequest')

// 获得所有标签
export const getTags = () => httpRequest.get('getTags')
// 删除标签
export const deleteTagById = (id) => httpRequest.get(`deleteTag/${id}`)
// 更新标签
export const updateTagById = (id, data) => httpRequest.post(`updateTag/${id}`, data)
// 插入标签
export const addTag = (data) => httpRequest.post('addTag', data)
//查询标签
export const getTagById = (id) => httpRequest.get(`getTag/${id}`)

// 获得所有文章
export const getArticles = () => httpRequest.get('getArticles')
// 修改文章
export const updateArticle = (id, data) => httpRequest.post(`updateArticle/${id}`, data)
// 删除文章
export const deleteArticle = (id) => httpRequest.get(`deleteArticle/${id}`)
//添加文章
export const addArticle = (data) => httpRequest.post('addArticle', data)
//查询文章
export const getArticleById = (id) => httpRequest.get(`getArticle/${id}`)

// 获得所有基金
export const getFunds = () => httpRequest.get('getFunds')
// 修改基金
export const updateFund = (id, data) => httpRequest.post(`updateFund/${id}`, data)
// 删除基金
export const deleteFund = (id) => httpRequest.get(`deleteFund${id}`)
//添加基金
export const addFund = (data) => httpRequest.post('addFund', data)
//查询基金
export const getFund = (id) => httpRequest.get(`getFund/${id}`)

// 用户登录
export const userLogin = (data) => httpRequest.post('login', data)





