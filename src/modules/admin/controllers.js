
const User = require('../../models/User');
const Article = require('../../models/Articles');

module.exports.getAllUsers = async (limit, offset) => {
  try {
    const users = await User
    .fetchPage({
      columns: ['id','first_name', 'last_name', 'email', 'member', 'shirt_size', 'is_admin'],
      limit,
      offset
    })

    return await users.orderBy('id')
    
  } catch (error) {
    throw error.message
  }
}

module.exports.createArticle = async (data) => {
  try{
    const _article = await new Article({
      ...data,
      tags: JSON.stringify(data.tags)
    }).save();

    return _article
  }
  catch(error) {
    throw error
  }
}