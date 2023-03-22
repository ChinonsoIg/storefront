interface IFormInput {
  htmlFor: string;
  title: string;
  type: string;
  name: string;
  placeholder: string;
  register: {};
  errors: string;
  data_testid: string;
}

const FormInput = ({ htmlFor, title, type, name, placeholder, register, errors, data_testid }: IFormInput) => {


  return (
    <div className="mb-3">
      <label htmlFor={htmlFor} className="flex flex-col text-md">
        {title}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          data-testid={data_testid}
          {...register}
          className="h-10 px-2 rounded-md border-none focus:outline-[color:var(--primary-color)] border-none"
        />
      </label>
      <span className="">{errors}</span>
    </div>
  )
}

export { FormInput };