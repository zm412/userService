function newViewItem(obj){
    const year = new Date(obj.year)
    const {brand, model, color, price, isClear, _id} = obj 
    const newObj = {brand, model, color, price, isClear, id: _id, year: year.getFullYear()}
    let newView = ''

    for(const key in newObj){
        if(newObj[key]){
            newView += key + ': ' + newObj[key] + ', '
        }
    }

    return newView
}

function sortField(arr, field, isReverse){
    let result

    if(['brand', 'model', 'color'].includes(field)){
        result = arr.sort((a, b) => {
            const stringA = a[field] ? a[field].toLowerCase() : ''
            const stringB = b[field]? b[field].toLowerCase() : ''

            if(stringA < stringB){
                return -1
            }

            if(stringA > stringB){
                return 1
            }

            return 0
        })
    }

   if(['year', 'registered'].includes(field)){
       result = arr.sort((a, b) => {
           const dateA = a[field] || 0
           const dateB = b[field] || 0

           return dateA - dateB
       })
   }
    
   if(field == 'price'){
        result = arr.sort((a, b) => {
           const priceA = a[field] || 0
           const priceB = b[field] || 0

           return priceA - priceB 
       })
   }

   return isReverse ? result.reverse() : result
}

function currentArguments(argsArr){
    const newCarData = {}

    argsArr.forEach(( param, index ) => {
        const newParam = param.split('=')
        const [key, value] = newParam
        newCarData[key] = value
    })


    return {
        'cars': { method: 'GET' },
        'oneCar': { method: 'GET' },
        'addCar': { 
            method: 'POST', 
            body: JSON.stringify( newCarData ), 
            headers: {'Content-Type': 'application/json'}
        },
        'remove': { 
            method: 'DELETE', 
            body: JSON.stringify({id: argsArr[0]}),
            headers: {'Content-Type': 'application/json'}
        },
        'sort': { 
            method: 'POST', 
            body: JSON.stringify( { field: argsArr[0], isReverse: argsArr[1] } ),
            headers: {'Content-Type': 'application/json'}
        },
        'filter': { 
            method: 'POST', 
            body: JSON.stringify( newCarData ) ,
            headers: {'Content-Type': 'application/json'}
        }
    }
}

module.exports = {newViewItem, sortField, currentArguments};
