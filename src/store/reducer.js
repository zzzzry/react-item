const initialState = {
	input: "",
};

export default (state = initialState, { type, payload }) => {
	switch (type) {
		case "INP":
			var newState = state;
			newState.input = payload;
			return newState;
		
		
		default:
			return state;
	}
};
