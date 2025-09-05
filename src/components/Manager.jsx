import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'

const Manager = () => {
    //states
    const [isEyeClosed, setIsEyeClosed] = useState(true)
    const [form, setForm] = useState({
        website: "",
        username: "",
        password: ""
    })
    const [passwords, setPasswords] = useState([])

    // Use Effects
    useEffect(() => {
        const main = async () => {
            const passwords = localStorage.getItem("passwords")
            if (passwords) {
                const finalPasswords = await JSON.parse(passwords)
                setPasswords(finalPasswords)
            }
        }
        main()
    }, [])


    //Refs
    const eye = useRef(null)

    //on clicks
    const handleEye = () => {
        setIsEyeClosed((prev) => {
            if (prev) {
                eye.current.src = "/icons/opened-eye.svg"
            } else {
                eye.current.src = "/icons/closed-eye.svg"
            }
            return !prev
        })
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const addPassword = () => {
        if (form.website.length > 3 && form.username.length > 3 && form.password.length > 3) {
            setPasswords([...passwords, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwords, { ...form, id: uuidv4() }]))
            setForm({ website: '', username: '', password: '' })
            toast.success("Password Saved!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        } else {
            toast.error('Minimum Length is 3!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    const copyText = (text, itemName) => {
        navigator.clipboard.writeText(text)
        toast.success(`${itemName} copied to clipboard!`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        })
    }

    const deletePassword = (id) => {
        let confirmed = confirm("Do you really want to delete the password?")
        if (confirmed) {
            setPasswords(passwords.filter((item) => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwords.filter((item) => item.id !== id)))
            toast.success("Password Deleted!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            })
        }
    }

    const editPassword = (id) => {
        console.log(`Editing Password with id: ${id}`)
        setForm(passwords.filter((it) => it.id === id)[0])
        setPasswords(passwords.filter((item) => item.id !== id))
    }

    return (
        <div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />

            <div className='my-container max-md:p-2 mb-15 z-50'>

                <h1 className='text-4xl font-bold text-center'><span className='text-green-700 '>&lt;</span>
                    Pass
                    <span className='text-green-500'>OPPY/&gt;</span></h1>
                <p className='text-green-500 text-lg text-center' >Your own Password Manager</p>


                <div className="text-black flex flex-col p-4 gap-3 items-center">
                    <input name='website' onChange={handleChange} value={form.website} className='border border-green-600 rounded-full px-2 py-1 w-full' placeholder='Enter Website URL' type="text" />
                    <div className="flex max-md:flex-col w-full justify-between gap-2">
                        <input name='username' onChange={handleChange} value={form.username} placeholder='Enter Username' className='border md:w-1/2 border-green-600 rounded-full px-2 py-1' type="text" />
                        <div className='relative md:w-1/2'>
                            <input name='password' onChange={handleChange} value={form.password} placeholder='Enter Password' className='border w-full border-green-600 rounded-full px-2 py-1' type={isEyeClosed ? "password" : "text"} />
                            <span className='absolute right-2'><img ref={eye} onClick={handleEye} className='pt-[5px] cursor-pointer' src="/icons/closed-eye.svg" alt="show" /></span>
                        </div>
                    </div>
                    <button onClick={addPassword} className=' text-sm flex justify-center items-center bg-green-400 border border-green-900 w-fit px-5 py-1  rounded-full hover:cursor-pointer gap-2 hover:bg-green-300'><lord-icon
                        src="https://cdn.lordicon.com/gzqofmcx.json"
                        trigger="hover" className='w-5'>
                    </lord-icon>Save</button>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-2xl py-2'>Your Passwords</h2>
                    {passwords.length === 0 && <div>No Passwords to Show</div>}
                    {passwords.length > 0 && <table className="table-auto w-full max-md:text-sm overflow-hidden rounded-2xl">
                        <thead className='bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwords.map((item, i) => {
                                return <tr key={i}>
                                    <td className='md:w-32 text-center md:py-2 border border-white text-blue-800'>
                                        <div className='flex gap-2 justify-between  md:px-2'>
                                            <a href={item.website} target='_blank'>
                                                {item.website}</a>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover"
                                                className="lordIconCopyButton w-6 h-6 max-md:w-4 max-md:h-4 cursor-pointer"
                                                onClick={() => { copyText(item.website, "Website URL") }}
                                            >
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td className='md:w-32 text-center md:py-2 border border-white'>
                                        <div className='flex gap-2 justify-between  md:px-2'>
                                            {item.username}
                                            <lord-icon
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover"
                                                className="lordIconCopyButton w-6 h-6 max-md:w-4 max-md:h-4 cursor-pointer"
                                                onClick={() => { copyText(item.username, "Username") }}
                                            >
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td className='md:w-32 text-center md:py-2 border border-white'>
                                        <div className='flex gap-2 justify-between md:px-2'>
                                            {item.password}
                                            <lord-icon
                                                src="https://cdn.lordicon.com/iykgtsbt.json"
                                                trigger="hover"
                                                className="lordIconCopyButton w-6 h-6 max-md:w-4 max-md:h-4 cursor-pointer"
                                                onClick={() => { copyText(item.password, "Password") }}
                                            >
                                            </lord-icon>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-white md:w-32'>
                                        <div className='flex gap-2 justify-center'>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/gwlusjdu.json"
                                                trigger="hover"
                                                className="lordIconCopyButton w-6 h-6 max-md:w-4 max-md:h-4 cursor-pointer"
                                                onClick={() => { editPassword(item.id) }}
                                            >
                                            </lord-icon>


                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                className="lordIconCopyButton w-6 h-6 max-md:w-4 max-md:h-4 cursor-pointer"
                                                onClick={() => { deletePassword(item.id) }}
                                            >
                                            </lord-icon>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>


            </div>
        </div>
    )
}

export default Manager
