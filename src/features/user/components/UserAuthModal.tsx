import ModalLayout from '@/layouts/ModalLayout'

// const UserAuthModal = (props: any) => {
//     return <p>Sigma</p>
//   return (
//     // <ModalLayout isOpen={true}>
//     //   {/* <Header title='User' onClose={onClose} /> */}
//     //   <>
//     //     <main className='p-4 flex flex-col gap-4'>
//     //       {/* {users.map((conf, index) => (
//     //     //   <Input {...conf} label={conf.label} action={conf.action} key={index} />
//     //     <input {conf.label}/>
//     //     ))} */}
//     //       <details>
//     //         <summary className='text-gh-gray select-none cursor-pointer'>Advanced</summary>
//     //         <div className='flex flex-col pt-4 gap-2'>
//     //           {/* <Regular danger text='Delete account' /> */}
//     //         </div>
//     //       </details>
//     //     </main>
//     //     <hr></hr>
//     //     <footer className='p-4 flex flex-col gap-2'>{/* <Regular text='Signout' /> */}</footer>
//     //   </>
//     // </ModalLayout>
//   )
// }
const UserAuthModal = () => {
  return (
    <ModalLayout isOpen={true}>
      <section>
        <details>
          <summary className='text-gh-gray select-none cursor-pointer'>Advanced</summary>
          <div className='flex flex-col pt-4 gap-2'>
            {/* <Regular danger text='Delete account' /> */}
          </div>
        </details>
      </section>
    </ModalLayout>
  )
}

export default UserAuthModal
