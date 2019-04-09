
export function changePage(page){
    return {
        type:"CHANGE_PAGE",
        curpage: page
    }
}

export function changeCurrency(country){
    return {
        type:"CHANGE_CURRENCY",
        currency: country
    }
}
