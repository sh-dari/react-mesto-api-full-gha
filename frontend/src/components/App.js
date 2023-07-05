import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import api from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { AppContext } from '../contexts/AppContext';
import * as auth from '../utils/auth';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [isRegistrationPopupOpen, setIsRegistrationPopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});
  const [loading, setLoading] = useState(false);

  const [currentUser, setСurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState("");

  const [delitingCard, setDelitingCard] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);
  const [successRegistration, setSuccessRegistration] = useState(false);

  const navigate = useNavigate();

  const handleTokenCheck = useCallback(() => {
    if (localStorage.getItem('jwt')){
      auth.checkToken()
      .then((res) => {
        console.log(res)
        if (res){
          setLoggedIn(true);
          navigate("/", {replace: true});
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [navigate]);

  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);

  useEffect(() => {
    if (loggedIn) {
      api.getDataToLoadPage()
      .then(data => {
        const [userData, initialCardsData] = data;
        setСurrentUser(userData);
        setCards(initialCardsData);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }, [loggedIn]);

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsRegistrationPopupOpen(false);
    setSelectedCard({});
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };
  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };
  const handleCardLike = (card) => {
    const isLiked = card.likes.some(user => user === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards(state => state.map(current => current._id === card._id ? newCard : current));
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const handleCardDelete = (card) => {
    setIsDeletePopupOpen(true);
    setDelitingCard(card);
  };
  const handlePopupDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards(state => state.filter(item => item !== card));
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    });
  };
  const handlePopupDeleteSubmit = (evt) => {
    evt.preventDefault();
    handlePopupDelete(delitingCard);
  };

  const handleUpdateUser = (profile) => {
    setLoading(true);
    api.updateUserInfo(profile).then((userData) => {
      setСurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  };
  const handleUpdateAvatar = ({avatar}) => {
    setLoading(true);
    api.changeAvatar(avatar).then((userData) => {
      setСurrentUser(userData);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleCreateCard = (card) => {
    setLoading(true);
    api.addNewCard(card).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
    });
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleEmailClean = () => {
    setLoggedIn(false);
    setUserEmail("");
  };

  const handleAuthorize = (values, setValues) => {
    auth.authorize(values.password, values.email)
    .then((data) => {
      if (data){
        localStorage.setItem('jwt', data.token);
        setUserEmail(values.email);
        setValues({password: '', email: ''});
        handleLogin();
        navigate('/', {replace: true});
      }
    })
    .catch((err) => {
      console.log(err);
    });
  };

  const handleRegister = (values) => {
    auth.register(values.password, values.email)
    .then((data) => {
      setSuccessRegistration(true);
      navigate('/sign-in', {replace: true});
      return data
    })
    .catch(err => {
      console.log(err);
      setSuccessRegistration(false);
    })
    .finally(() => {
      setIsRegistrationPopupOpen(true);
    });
  };

  return (
    <AppContext.Provider value={ {loggedIn, handleLogin } }>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header userEmail={userEmail} handleEmailClean={handleEmailClean}/>
          <Main
            isEditAvatarPopupOpen={handleEditAvatarClick}
            isEditProfilePopupOpen={handleEditProfileClick}
            isAddPlacePopupOpen={handleAddPlaceClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            cards={cards}
            handleAuthorize={handleAuthorize}
            handleRegister={handleRegister}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={loading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onCreateCard={handleCreateCard}
            isLoading={loading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={loading}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            button="Да"
            isOpen={isDeletePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handlePopupDeleteSubmit}
            isValid={true}
          />
          <InfoTooltip isOpen={isRegistrationPopupOpen} onClose={closeAllPopups} successRegistration={successRegistration} />
          <Footer />
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
