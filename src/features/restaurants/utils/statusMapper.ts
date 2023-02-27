import { DetailsAPI, PlacesAPI } from '../types'

export function statusMapper(status: DetailsAPI['status'] | PlacesAPI['status']) {
  switch (status) {
    case 'INVALID_REQUEST':
      return '無効なリクエスト'
    case 'NOT_FOUND':
      return 'データが見つかりませんでした。'
    case 'OVER_QUERY_LIMIT':
      return 'API通信回数が制限に達しました。'
    case 'REQUEST_DENIED':
      return 'リクエストが拒否されました。'
    case 'UNKNOWN_ERROR':
      return '不明なエラーが発生しました。'
    case 'ZERO_RESULTS':
      return '結果は0件でした。'
    default:
      return ''
  }
}
