const { httpRequest } = require('./httpRequest')
const POST = 'POST'
// 获得所有标签
export const getTags = () => httpRequest('getTags')
// 删除标签
export const deleteTagById = (id) => httpRequest(`deleteTag/${id}`)
// 更新标签
export const updateTagById = (id, data) => httpRequest(`updateTag/${id}`, data, POST)
// 插入标签
export const addTag = (data) => httpRequest('addTag', data, POST)
//查询标签
export const getTagById = (id) => httpRequest(`getTag/${id}`)

// 获得所有文章
export const getArticles = (data={}) => httpRequest('getArticles', data)
// 修改文章
export const updateArticle = (id, data) => httpRequest(`updateArticle/${id}`, data, POST)
// 删除文章
export const deleteArticle = (id) => httpRequest(`deleteArticle/${id}`)
//添加文章
export const addArticle = (data) => httpRequest('addArticle', data, POST)
//查询文章
export const getArticleById = (id) => httpRequest(`getArticle/${id}`)

// 获得所有基金
export const getFunds = () => httpRequest('getFunds')
// 修改基金
export const updateFund = (id, data) => httpRequest(`updateFund/${id}`, data, POST)
// 删除基金
export const deleteFund = (id) => httpRequest(`deleteFund/${id}`)
//添加基金
export const addFund = (data) => httpRequest('addFund', data, POST)
//查询基金
export const getFund = (id) => httpRequest(`getFund/${id}`)

// 用户登录
export const userLogin = (data) => httpRequest('login', data, POST)

// 查询股票信息
export const getStockDataById = (id) => httpRequest(`getStock/${id}`)





