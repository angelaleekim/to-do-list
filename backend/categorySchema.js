const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    userId: {
      type: Object,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      default: 'title',
      trim: true
    },
    parentId: {
      type: Number,
      trim: true
    },
    icon: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: true
    },
    deleted: {
        type: Boolean,
        default: false
    },
  },
  { collection: 'tasks' }
)

module.exports = categorySchema