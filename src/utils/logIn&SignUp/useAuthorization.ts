import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";

export const errorAlert = (code: string) => {
  switch (code) {
    case "auth/user-not-found" || "auth/wrong-password":
      return "이메일 혹은 비밀번호가 일치하지 않습니다.";
    case "auth/email-already-in-use":
      return "이미 사용 중인 이메일입니다.";
    case "auth/weak-password":
      return "비밀번호는 6글자 이상이어야 합니다.";
    case "auth/account-exists-with-different-credential":
      return "같은 이메일로 가입한 다른 계정이 있습니다.";
    case "auth/network-request-failed":
      return "네트워크 연결에 실패 하였습니다.";
    case "auth/invalid-email":
      return "잘못된 이메일 형식입니다.";
    case "auth/internal-error":
      return "잘못된 요청입니다.";
    default:
      return "로그인에 실패 하였습니다.";
  }
};

export const assetData = {
  asset: {
    cash: 100000,
  },
};

export const providerName = (name: string) => {
  let provider: GoogleAuthProvider | GithubAuthProvider =
    new GoogleAuthProvider();

  if (name === "google") {
    provider = new GoogleAuthProvider();
  }
  if (name === "github") {
    provider = new GithubAuthProvider();
  }
  return provider;
};
