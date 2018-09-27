import { HTTP } from '../util/http';

class LikeModel extends HTTP {
  // 点赞或者取消点赞
  like (behavior, artId, category) {
    let url = behavior==='like' ? '/like' : '/like/cancel'
    this.request({
      url,
      method: 'POST',
      data: {
        art_id: artId,
        type: category
      }
    })
  }
  // 获取点赞的信息
  getClassicLike (artId, category) {
    return this.request({
      url: `/classic/${category}/${artId}/favor`
    })
  }
}
export { LikeModel }