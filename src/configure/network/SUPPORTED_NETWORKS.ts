// ! 임시 값 반전
// todo 현재 네트워크를 플래그로 변경

export const SUPPORTED_NETWORKS =
	process.env.REACT_APP_ENV !== "production"
		? {
				1: "ETHEREUM",
				56: "BSC",
				137: "POLYGON",
				1285: "MOONRIVER",
		  }
		: {
				42: "KOVAN",
				97: "BSCTEST",
				80001: "MUMBAI",
				1287: "MBase",
		  };
