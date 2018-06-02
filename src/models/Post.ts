import { model, Schema } from 'mongoose';

// tslint:disable object-literal-sort-keys
const PostSchema: Schema = new Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    default: '',
    required: true
  },
  content: {
    type: String,
    default: '',
    required: true
  },
  featuredImage: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  liked: {
    type: Boolean,
    default: false
  }
});

export default model('Post', PostSchema);