import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
});

const Hookform = () => {

    const { register, handleSubmit, watch, formState: {errors } } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema)
    })

    const onSubmit = (data) => {
        console.log(data)
    }

    console.log(watch("email"))
    console.log(errors)

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-8">
                    <label
                        htmlFor="email"
                        className={`block font-bold text-sm mb-2 ${
                        errors.email ? "text-red-400" : "text-purple-400"
                            }`}
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="hey@chrisoncode.io"
                        className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 placeholder-purple-500 focus:bg-purple-600 ${
                        errors.email ? "text-red-300 border-red-400" : "text-purple-200 border-purple-400"
                            }`}
                        {...register("email")}
                    />
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-2">
                            A valid email is required
                        </p>
                    )}
                </div>

                <div className="mb-8">
                    <label
                        htmlFor="password"
                        className={`block font-bold text-sm mb-2 ${
                        errors.password ? "text-red-400" : "text-purple-400"
                            }`}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        className={`block w-full bg-transparent outline-none border-b-2 py-2 px-4 placeholder-purple-500 focus:bg-purple-600 text-purple-200 ${
                        errors.password ? "border-red-400" : "border-purple-400"
                            }`}
                        {...register("password")}
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                <button className="inline-block bg-yellow-500 text-yellow-800  rounded shadow py-2 px-5 text-sm">
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Hookform