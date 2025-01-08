import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SessionComponent = ({ onClose }) => {
  const { t } = useTranslation("session");

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [modeTir, setModeTir] = useState('Tir standard'); 
  const [arme, setArme] = useState('M4A4'); 

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Form submitted with data:", {
      modeTir,
      arme,
      dateHeure: currentTime,
    });

    onClose()
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-40">
      <div className="bg-primaryBrown text-white p-4 rounded-3xl w-1/2 h-1/4 flex flex-col relative border-4 border-secondaryPale">
        <div className="flex justify-between items-center h-1/4">
          <h2 className="text-3xl font-bold font-title mb-2 text-black">{t('new_session')}</h2>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center space-y-4 mb-4">
          <div className="flex justify-center items-center space-x-4 w-full mb-4">
            <div className="w-1/3">
              <label htmlFor="modeTir" className="block text-lg font-title font-semibold text-black mb-2">
                {t('shot_mode')}
              </label>
              <select 
                id="modeTir"
                value={modeTir}
                onChange={(e) => setModeTir(e.target.value)}
                className="bg-primaryPale text-black font-title font-semibold rounded-full px-2 py-2 focus:outline-none w-full"
              >
                <option value="Tir standard">{t("STD_shot")}</option>
                <option value="Tir Interactif">{t("INT_shot")}</option>
              </select>
            </div>

            <div className="w-1/3">
              <label htmlFor="arme" className="block text-lg font-title font-semibold text-black mb-2">
                {t('weapon')}
              </label>
              <select
                id="arme"
                value={arme}
                onChange={(e) => setArme(e.target.value)}
                className="bg-primaryPale text-black font-title font-semibold rounded-full px-2 py-2 focus:outline-none w-full"
              >
                <option value="M4A4">M4A4</option>
                <option value="Glock">Glock</option>
                <option value="AWP">AWP</option>
              </select>
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <button
              type="submit"
              className="bg-primaryPale text-black font-semibold font-secondary px-4 py-2 rounded-full hover:bg-secondaryPale"
            >
              {t("start")}
            </button>
          </div>
        </form>

        <div className="absolute bottom-4 left-4 text-black font-secondary font-semibold">
          <p>{currentTime}</p>
        </div>
      </div>
    </div>
  );
};

export default SessionComponent;
