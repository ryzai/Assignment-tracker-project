// Add new assignment form
router.get('/add', (req, res) => res.render('form', { assignment: {} }));


//Create Assignment
router.post('/', async (req, res) => {
    await Assignment.create(req.body);
    res.redirect('/assignments');
});

//Edit Assignment
router.get('/edit/:id', async (req, res) => {
    const assignment = await Assignment.findById(req.params.id);
    res.render('form', { assignment });
});


//Update Assignment
router.put('/:id', async (req, res) => {
    await Assignment.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/assignments');
});

//Delete Assignment
router.delete('/:id', async (req, res) => {
    await Assignment.findByIdAndDelete(req.params.id);
    res.redirect('/assignments');
});


// Read all assignmnets
router.get('/', async (req, res) => {
    const assignments = await Assignment.find();
    res.render('list', { assignments });
});
