//jquery

$(document).ready(function () {
    $('#title').autocomplete({
        source: async function (request, response) {
            let data = await fetch(`http://localhost:8000/search?query=${request.term}`)
                //fetch something, get results back and turn into JSON
                .then(results => results.json())
                .then(results => results.map(result => {
                    return {
                        label: result.title, 
                        value: result.title, 
                        id: result._id
                    }
                }))
                response(data)
        },
        minLength: 2, 
        select: function (event, ui) {
            console.log(ui.item.id)
            fetch(`http://localhost:8000/get/${ui.item.id})
                .then(result => result.json())
                .then(result => {
                    $('#cast').empty()
                    result.cast.forEach(cast =>
                        {
                            $(cast).append(`${ cast }`)
                            
                        })
                        $('img').attr('src', result.poster)
                }
        }
    })
       
})
    