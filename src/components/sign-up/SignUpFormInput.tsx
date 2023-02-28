interface IForm {
  [key: string]: string;
}
interface IValidForm {
  [key: string]: boolean;
}

export default function SignUpFormInput({
  name,
  form,
  onChangeForm,
  validForm,
}: {
  name: string;
  form: IForm;
  onChangeForm: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validForm: IValidForm;
}) {
  const formMessage = (name: string) => {
    const Iform = {
      type: "",
      placeholder: "",
    };

    if (name === "email") {
      Iform.type = "text";
      Iform.placeholder = "이메일을 입력해주세요.";
    }
    if (name === "password") {
      Iform.type = "password";
      Iform.placeholder = "비밀번호를 입력해주세요.";
    }
    if (name === "verifyPassword") {
      Iform.type = "password";
      Iform.placeholder = "비밀번호를 다시 입력해주세요.";
    }

    return Iform;
  };

  const test = (name: string) => {
    if (validForm[name]) return null;
    if (name === "email") return "이메일 형식이 유효하지 않습니다.";
    if (name === "password")
      return "문자와 하나 이상의 숫자를 포함하여 8~10자리여야 합니다.";
    if (name === "verifyPassword") return "비밀번호가 일치하지 않습니다.";
  };

  return (
    <>
      <input
        name={name}
        value={form[name]}
        onChange={onChangeForm}
        className="w-[17rem] md:w-[20rem] h-8 p-3 mt-2 placeholder:text-black-200 text-black text-lg border-solid border-[3px] border-black rounded-lg focus:outline-yellow-200 focus:dark:outline-purple-200 focus:text-yellow-200 focus:dark:text-purple-200"
        type={formMessage(name).type}
        placeholder={formMessage(name).placeholder}
      />
      <div className="text-[0.7rem] text-red">{test(name)}</div>
    </>
  );
}
