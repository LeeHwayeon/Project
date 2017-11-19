// 최상단 require되는 구문에 추가

module.exports = (app, passport) => {
    app.get('/signin', (req, res, next) => {
      res.render('signin');
    });
  
    app.post('/signin', passport.authenticate('local-signin', {
      successRedirect : '/events', // redirect to the secure profile section
      failureRedirect : '/signin', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));
  
    app.get('/oauth/kakao',
      passport.authenticate('kakao', { scope : 'email' })
    );
  
    app.get('/oauth/kakao/callback',
      passport.authenticate('kakao', {
        failureRedirect : '/signin',
        
        failureFlash : true // allow flash messages
      }), (req, res, next) => {
        req.flash('success', 'Welcome!');
        res.redirect('/events');
      }
    );
  
    app.get('/signout', (req, res) => {
      req.logout();
      req.flash('success', 'Successfully signed out');
      res.redirect('/');
    });
  };
  

  