
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Assignments').del()
    .then(function () {
      // Inserts seed entries
      return knex('Assignments').insert([
        { assignment_name: 'Intro to HTML',
          isComplete: true,
          studentId: 1,
          cohortId: 1
        },
        { assignment_name: 'Intro to HTML',
          isComplete: true,
          studentId: 2,
          cohortId: 1
        },
        { assignment_name: 'Intro to HTML',
          isComplete: true,
          studentId: 3,
          cohortId: 1
        },
        { assignment_name: 'Intro to HTML',
          isComplete: true,
          studentId: 4,
          cohortId: 2
        },
        { assignment_name: 'Intro to CSS',
          isComplete: true,
          studentId: 1,
          cohortId: 1
        },
        { assignment_name: 'Intro to CSS',
          isComplete: true,
          studentId: 2,
          cohortId: 1
        },
        { assignment_name: 'Intro to CSS',
        isComplete: true,
        studentId: 3,
        cohortId: 1
        },
        { assignment_name: 'Intro to CSS',
          isComplete: true,
          studentId: 4,
          cohortId: 4
        },
        { assignment_name: 'Intro to JS',
          isComplete: true,
          studentId: 1,
          cohortId: 1
        },
        { assignment_name: 'Intro to JS',
          isComplete: true,
          studentId: 2,
          cohortId: 1
        },
        { assignment_name: 'Intro to JS',
          isComplete: false,
          studentId: 3,
          cohortId: 1
        },
        { assignment_name: 'Intro to JS',
          isComplete: true,
          studentId: 4,
          cohortId: 2
        },
        { assignment_name: 'Intro to Node',
        isComplete: true,
        studentId: 1,
        cohortId: 1
        },
        { assignment_name: 'Intro to Node',
          isComplete: true,
          studentId: 2,
          cohortId: 1
        },
        { assignment_name: 'Intro to Node',
        isComplete: false,
        studentId: 3,
        cohortId: 1
        },
        { assignment_name: 'Intro to Node',
          isComplete: true,
          studentId: 4,
          cohortId: 2
        },
        { assignment_name: 'Intro to SQL',
          isComplete: false,
          studentId: 1,
          cohortId: 1
        },
        { assignment_name: 'Intro to SQL',
          isComplete: false,
          studentId: 2,
          cohortId: 1
        },
        { assignment_name: 'Intro to SQL',
          isComplete: false,
          studentId: 3,
          cohortId: 1
        },
        { assignment_name: 'Intro to SQL',
          isComplete: true,
          studentId: 4,
          cohortId: 2
        }
      ]);
    });
};
