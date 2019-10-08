const fs = require('fs')
const mustache = require('mustache')
const express = require('express')
const app = express()
const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)
const port = 3000
const url = require('url')

// -----------------------------------------------------------------------------
// Express.js Endpoints
app.use(express.urlencoded())

const homepageTemplate = fs.readFileSync('./templates/homepage.mustache', 'utf8')
const cohortsTemplate = fs.readFileSync('./templates/cohorts.mustache', 'utf8')
const studentTemplate = fs.readFileSync('./templates/students.mustache', 'utf8')

let allCohorts;
app.get('/', function (req, res) {
  getAllCohorts()
    .then(function (allCohorts) {
      res.send(mustache.render(homepageTemplate, { cohortsListHTML: renderAllCohorts(allCohorts) }))
    })

})


app.get('/students', function (req, res){
  let queryData = url.parse(req.url, true).query;
  let id = parseInt(queryData.id)
  console.log('get request made, id:', id)
  getStudent(id) 
    .then(function (student) {
       res.send(mustache.render(homepageTemplate, { getStudentHTML: renderStudent(student) }))
    
  })
    .catch(function (error) {
      console.log(error)
      res.status(500).send('Something went wrong.')
  })
})

app.get('/assignments', function (req, res){
  let queryData = url.parse(req.url, true).query;
  console.log('queryData', queryData)
  let name = queryData.name
  console.log('name', name)
  getAssignment(name) 
    .then(function (assignment) {
       res.send(mustache.render(homepageTemplate, { getAssignmentHTML: renderAllAssignmentData(assignment) }))
     
    
  })
    .catch(function (error) {
      console.log(error)
      res.status(500).send('Something went wrong.')
  })
})

app.post('/cohorts', function (req, res) {
  createCohort(req.body)
    .then(function () {
      res.send(mustache.render(cohortsTemplate, { createdCohortHTML: renderCreatedCohort(req.body) }))     
    })
    .catch(function (error) {
      console.log(error)
      res.status(500).send('Something went wrong.')
    })


})


app.get('/cohorts/:slug', function (req, res) {
  getOneCohort(req.params.slug)
    .then(function (cohort) {
      res.send('<pre>' + prettyPrintJSON(cohort) + '</pre>')
    })
    .catch(function (err) {
      res.status(404).send('cohort not found :(')
    })
})

app.listen(port, function () {
  console.log('Listening on port ' + port + ' 👍')
})

// -----------------------------------------------------------------------------
// HTML Rendering
function renderAllCohorts (allCohorts) {
  return '<ul>' + allCohorts.map(renderCohort).join('') + '</ul>'
}

function renderCohort (cohort) {
  return `<li><a href="/cohorts/${cohort.slug}">${cohort.title}</a></li>`
}

function renderCreatedCohort(cohort){
  return `<div>
              <p>You created a new cohort.</p>
              <p>title: ${cohort.title}</p>
              <p>slug: ${cohort.title}</p>
          </div>`
}

function renderStudent (student) {
  return `<h3>search result:</h3><p>student name: ${student.name}</p>`
}

function renderAllAssignmentData (assignmentArr){
  return '<div>' + '<p> Assignment: '+assignmentArr[0].assignment_name+'</p>' + assignmentArr.map(renderAssignmentData).join('') + '</div>'
  
}

function renderAssignmentData(assignment){
  let assigmentStatus;
  if(assignment.isComplete === 1){assigmentStatus = 'complete'}
  else{assigmentStatus = 'incomplete'}
  return `<p>${assignment.name}: ${assigmentStatus}.</p>`
}


// -----------------------------------------------------------------------------
// Database Queries

const getAllCohortsQuery = `
  SELECT *
  FROM Cohorts
`

function getAllCohorts () {
  return db.raw(getAllCohortsQuery)
}

function getOneCohort (slug) {
  return db.raw('SELECT * FROM Cohorts WHERE slug = ?', [slug])
    .then(function (results) {
      if (results.length !== 1) {
        throw null
      } else {
        return results[0]
      }
    })
}

function getStudent(id) {
  console.log("in getStudent fxn, id:", id)
  return db.raw('SELECT * FROM Students WHERE id = ?', [id])  
  //return db.raw('SELECT * FROM Students')  
    .then(function(results) {
      console.log(results)
      //return results
      if (results.length !== 1) {
        
        throw null
      } else {
        return results[0]
      }
  })
}

function getAssignment(name) {
  
  // return db.raw('SELECT * FROM Assignments WHERE assignment_name = ?', [name])
  return db.raw('SELECT assignment_name,  name, isComplete FROM Assignments JOIN Students ON Assignments.studentID = Students.id WHERE assignment_name = ?', [name])
    .then(function(results) {
      console.log('results', results)
      if (!results) {
        throw null
      } else {
        return results
      }
  })
}

function createCohort (cohort) {
  return db.raw('INSERT INTO Cohorts (title, slug, isActive) VALUES (?, ?, true)', [cohort.title, cohort.slug])
}


// -----------------------------------------------------------------------------
// Misc

function prettyPrintJSON (x) {
  return JSON.stringify(x, null, 2)
}
