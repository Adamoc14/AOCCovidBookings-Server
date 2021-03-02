const express = require('../Helpers_and_Prerequisites/libs_required').express,
    router = express.Router(),
    covid_term = require('../DB/Models/covid_term')

// Router is mounted at /api/v1/covid_terms , all routes after this will be prefixed with this

router.get("/", async (req, res) => {
    const terms = await covid_term.find({})
    res.send(terms)
})

router.post("/", async (req, res) => {
    const {Min_Age , Date , Month} = req.body
    const covidTermData = {Min_Age,  Date , Month};
    let createdCovid_Term = await covid_term.create(covidTermData)
    res.send(createdCovid_Term);
})

router.put("/:id", async (req, res, next) => {
    try {
        const { id } = req.params,
            { Min_Age,  Date , Month} = req.body
        newCovidTerms = { Min_Age , Date , Month }
        await covid_term.findByIdAndUpdate(id, newCovidTerms, (err, updatedCovidTerms) => {
            if (err) console.log(err)
            res.send(updatedCovidTerms)
        })
    } catch (error) {
        next(error)
    }
    
})


module.exports = router