import { Props } from '../index.types'

const Clock = ({ width = 20, height = 20, fill = 'white' }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M11 10.175L13.25 12.425C13.4333 12.6083 13.525 12.8377 13.525 13.113C13.525 13.3877 13.4333 13.625 13.25 13.825C13.05 14.025 12.8127 14.125 12.538 14.125C12.2627 14.125 12.025 14.025 11.825 13.825L9.7 11.7C9.46667 11.4667 9.29167 11.2083 9.175 10.925C9.05833 10.6417 9 10.3333 9 10V7C9 6.71667 9.096 6.479 9.288 6.287C9.47933 6.09567 9.71667 6 10 6C10.2833 6 10.521 6.09567 10.713 6.287C10.9043 6.479 11 6.71667 11 7V10.175ZM10 2C10.2833 2 10.521 2.09567 10.713 2.287C10.9043 2.479 11 2.71667 11 3C11 3.28333 10.9043 3.521 10.713 3.713C10.521 3.90433 10.2833 4 10 4C9.71667 4 9.47933 3.90433 9.288 3.713C9.096 3.521 9 3.28333 9 3C9 2.71667 9.096 2.479 9.288 2.287C9.47933 2.09567 9.71667 2 10 2ZM18 10C18 10.2833 17.904 10.5207 17.712 10.712C17.5207 10.904 17.2833 11 17 11C16.7167 11 16.4793 10.904 16.288 10.712C16.096 10.5207 16 10.2833 16 10C16 9.71667 16.096 9.479 16.288 9.287C16.4793 9.09567 16.7167 9 17 9C17.2833 9 17.5207 9.09567 17.712 9.287C17.904 9.479 18 9.71667 18 10ZM10 16C10.2833 16 10.521 16.096 10.713 16.288C10.9043 16.4793 11 16.7167 11 17C11 17.2833 10.9043 17.5207 10.713 17.712C10.521 17.904 10.2833 18 10 18C9.71667 18 9.47933 17.904 9.288 17.712C9.096 17.5207 9 17.2833 9 17C9 16.7167 9.096 16.4793 9.288 16.288C9.47933 16.096 9.71667 16 10 16ZM4 10C4 10.2833 3.90433 10.5207 3.713 10.712C3.521 10.904 3.28333 11 3 11C2.71667 11 2.479 10.904 2.287 10.712C2.09567 10.5207 2 10.2833 2 10C2 9.71667 2.09567 9.479 2.287 9.287C2.479 9.09567 2.71667 9 3 9C3.28333 9 3.521 9.09567 3.713 9.287C3.90433 9.479 4 9.71667 4 10ZM10 20C8.61667 20 7.31667 19.7373 6.1 19.212C4.88333 18.6873 3.825 17.975 2.925 17.075C2.025 16.175 1.31267 15.1167 0.788 13.9C0.262667 12.6833 0 11.3833 0 10C0 8.61667 0.262667 7.31667 0.788 6.1C1.31267 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.31233 6.1 0.787C7.31667 0.262333 8.61667 0 10 0C11.3833 0 12.6833 0.262333 13.9 0.787C15.1167 1.31233 16.175 2.025 17.075 2.925C17.975 3.825 18.6873 4.88333 19.212 6.1C19.7373 7.31667 20 8.61667 20 10C20 11.3833 19.7373 12.6833 19.212 13.9C18.6873 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6873 13.9 19.212C12.6833 19.7373 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z'
        fill={fill}
      />
    </svg>
  )
}

export default Clock
