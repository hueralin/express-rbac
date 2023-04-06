const ResourceModel = require('../models/resource')

// 获取资源列表
async function getResourceList (req, res) {
  try {
    const resourceList = await ResourceModel.findAll()
    res.json({ code: 0, data: resourceList, message: '' })
  } catch (err) {
    const message = `get resource list failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

// 创建资源
async function createResource (req, res) {
  try {
    const { resource_name, resource_cname = '', resource_type, resource_value, status = true } = req.body
    const resource = await ResourceModel.create({
      resource_name,
      resource_cname,
      resource_type,
      resource_value,
      status
    })
    res.json({ code: 0, data: resource, message: '' })
  } catch (err) {
    const message = `create resource failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

// 更新资源
async function updateResource (req, res) {
  try {
    const { id, resource_name, resource_cname, resource_type, resource_value, status } = req.body
    const rows = await ResourceModel.update({
      resource_name,
      resource_cname,
      resource_type,
      resource_value,
      status
    }, { where: { id } })
    if (rows > 0) {
      res.json({ code: 0, data: null, message: '更新资源成功' })
    } else {
      res.json({ code: -1, data: null, message: '更新资源失败' })
    }
  } catch (err) {
    const message = `update resource failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

// 删除资源
async function deleteResource (req, res) {
  try {
    const { id } = req.query
    const rows = await ResourceModel.destroy({ where: { id } })
    if (rows > 0) {
      res.json({ code: 0, data: null, message: '删除资源成功' })
    } else {
      res.json({ code: -1, data: null, message: '删除资源失败' })
    }
  } catch (err) {
    const message = `delete resource failed: ${err.message}`
    console.error(message)
    res.json({ code: -1, data: null, message })
  }
}

module.exports = {
  getResourceList,
  createResource,
  updateResource,
  deleteResource
}
