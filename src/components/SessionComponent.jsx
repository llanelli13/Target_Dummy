import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SessionComponent = ({ onClose }) => {
  const { t } = useTranslation("session");

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
  const [modeTir, setModeTir] = useState('Tir standard');  // State for mode de tir
  const [arme, setArme] = useState('M4A4');  // State for choix de l'arme

  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Log form data
    console.log("Form submitted with data:", {
      modeTir,
      arme,
      dateHeure: currentTime,
    });

    // You can send this data to an API or save it as needed
    onClose()
    alert('Form submitted!');
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-lightBeige text-white p-4 rounded-3xl w-1/2 h-1/4 flex flex-col relative">
        {/* Header section */}
        <div className="flex justify-between items-center h-1/4">
          <h2 className="text-2xl font-semibold mb-2 text-black">{t('new_session')}</h2>
        </div>

        {/* Form content */}
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center space-y-4 mb-4">
          {/* Dropdowns in the same line */}
          <div className="flex justify-center items-center space-x-4 w-full mb-4">
            {/* Mode de tir dropdown */}
            <div className="w-1/3">
              <label htmlFor="modeTir" className="block text-lg text-black mb-2">
                {t('shot_mode')}
              </label>
              <select
                id="modeTir"
                value={modeTir}
                onChange={(e) => setModeTir(e.target.value)}
                className="bg-gray-600 text-white rounded-full px-2 py-2 focus:outline-none w-full"
              >
                <option value="Tir standard">Tir Standard</option>
                <option value="Tir Interactif">Tir Interactif</option>
              </select>
            </div>

            {/* Arme dropdown */}
            <div className="w-1/3">
              <label htmlFor="arme" className="block text-lg text-black mb-2">
                {t('weapon')}
              </label>
              <select
                id="arme"
                value={arme}
                onChange={(e) => setArme(e.target.value)}
                className="bg-gray-600 text-white rounded-full px-2 py-2 focus:outline-none w-full"
              >
                <option value="M4A4">M4A4</option>
                <option value="Glock">Glock</option>
                <option value="AWP">AWP</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="absolute bottom-4 right-4">
            <button
              type="submit"
              className="bg-pastelBlue text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
              {t("start")}
            </button>
          </div>
        </form>

        {/* Bottom section with current time */}
        <div className="absolute bottom-4 left-4 text-black">
          <p>{currentTime}</p>
        </div>
      </div>
    </div>
  );
};

export default SessionComponent;
