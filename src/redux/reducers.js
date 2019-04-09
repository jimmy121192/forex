const pageDefault ={
    page: "Landing",
    currency: "CAD"

}

export function Page(state = pageDefault, action){
    let obj = Object.assign({}, state)

    switch(action.type) {
            case "CHANGE_PAGE":
            obj.page =action.curpage;
            return obj;

            case "CHANGE_CURRENCY":
            obj.currency =action.currency;
            return obj;

        default:
            return state;
            
    }
}
