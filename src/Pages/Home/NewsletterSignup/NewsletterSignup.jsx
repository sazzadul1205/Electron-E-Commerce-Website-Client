import { useForm } from 'react-hook-form';
import Title from '../../Components/Title';
import "./NewsletterSignup.css"

const NewsletterSignup = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className=' Newsletter-item bg-fixed'>
            <Title
                title={'Subscribe to Our Newsletter'}
                subtitle={'Sign up for our newsletter to receive exclusive offers, updates, and more.'}
            ></Title>
            <div className='mx-[200px]'>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className='flex gap-5'>
                        {/* Name */}
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-blue-500 text-xl font-semibold">Name</span>
                            </label>
                            <input
                                type="text"
                                {...register('name', { required: true })}
                                name="name"
                                placeholder="Your Name"
                                className="input input-bordered"
                            />
                        </div>
                        {/* Email */}
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text text-blue-500 text-xl font-semibold">Email</span>
                            </label>
                            <input
                                type="email"
                                {...register('email', { required: true })}
                                name="email"
                                placeholder="Your Email"
                                className="input input-bordered"
                            />
                        </div>
                    </div>
                    <div className="form-control mt-6 text-white">

                        <input
                            className={`bg-blue-500 hover:bg-blue-300 text-white rounded-lg w-full p-2 flex items-center justify-center`}
                            type="submit"
                            value="Subscribe"
                        />
                    </div>
                </form>
            </div>

        </div>
    );
};

export default NewsletterSignup;