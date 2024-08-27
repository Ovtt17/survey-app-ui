import Button from '@mui/material/Button';
import { SelectChangeEvent } from '@mui/material/Select';
import React, { useEffect, useState } from 'react';
import AccordionList from '../components/survey/AccordionList';
import { Question } from '../types/question';
import { QuestionType } from '../types/questionType';
import { Survey } from '../types/survey';
import { createSurvey, getSurveyById, updateSurvey } from '../services/surveyService';
import { QuestionOption } from '../types/questionOption';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditSurveyContext } from '../context/EditSurveyContext';
import { useAuthContext } from '../context/AuthContext';

interface AccordionState {
  id: number;
  expanded: boolean;
  question: Question;
}

const CreateSurveyForm = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  const { id, username } = useParams<{ id: string, username: string }>();
  const { isEditable, setIsEditable } = useEditSurveyContext();
  const [accordions, setAccordions] = useState<AccordionState[]>([
    { id: 1, expanded: false, question: { text: '', type: QuestionType.SELECCION_UNICA as QuestionType, options: [] as QuestionOption[] } }
  ]);

  const [formData, setFormData] = useState<Survey>(
    {
      title: '',
      description: '',
      questions: []
    }
  );

  useEffect(() => {
    if (!id) {
      setFormData({
        title: '',
        description: '',
        questions: []
      });
      setAccordions([
        { id: 1, expanded: false, question: { text: '', type: QuestionType.SELECCION_UNICA as QuestionType, options: [] as QuestionOption[] } }
      ]);
    } else {
      setIsEditable(Boolean(isAuthenticated && user?.username === username));
      if (isEditable) {
        const fetchSurveyData = async () => {
          try {
            const surveyData = await getSurveyById(id);
            setFormData(surveyData);
            setAccordions(surveyData.questions.map((question: Question, index: number) => ({
              id: index + 1,
              expanded: false,
              question
            })));
          } catch (error) {
            console.error('Error fetching survey data:', error);
          }
        };
        fetchSurveyData();
      }
    }
  }, [id, isEditable, isAuthenticated, username, user?.username, setIsEditable]);

  const handleExpansion = (panelId: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setAccordions((prevAccordions) =>
      prevAccordions.map((accordion) =>
        accordion.id === panelId ? { ...accordion, expanded: isExpanded } : accordion
      )
    );
  };

  const handleInputChange = (id: number, value: string) => {
    setAccordions((prevAccordions) =>
      prevAccordions.map((accordion) =>
        accordion.id === id ? { ...accordion, question: { ...accordion.question, text: value } } : accordion
      )
    );
  };

  const handleTypeChange = (id: number, event: SelectChangeEvent<Question['type']>) => {
    const value = event.target.value as Question['type'];
    setAccordions((prevAccordions) =>
      prevAccordions.map((accordion) =>
        accordion.id === id ? { ...accordion, question: { ...accordion.question, type: value } } : accordion
      )
    );
  };

  const addAccordion = () => {
    setAccordions((prevAccordions) => [
      ...prevAccordions,
      { id: prevAccordions.length + 1, expanded: false, question: { text: '', type: QuestionType.SELECCION_UNICA, options: [] as QuestionOption[] } },
    ]);
  };

  const removeAccordion = (id: number) => {
    setAccordions((prevAccordions) => prevAccordions.filter((accordion) => accordion.id !== id));
  };

  const createOrUpdateSurvey = async (event: React.FormEvent) => {
    event?.preventDefault();
    const survey: Survey = {
      ...formData,
      questions: accordions.map((accordion) => accordion.question)
    };
    if (isEditable) {
      await updateSurvey(survey);
      navigate(`/${user?.username}/surveys`);
    } else {
      await createSurvey(survey);
      navigate('/');
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-5'>{isEditable ? 'Editar Encuesta' : 'Crear Encuesta' }</h2>
      <div className='flex justify-center items-center'>
        <div className='w-11/12 bg-white p-8 rounded-lg shadow-xl'>
          <form onSubmit={createOrUpdateSurvey}>
            {/* Survey Title */}
            <div className='mb-6'>
              <label className="block text-gray-600 mb-2">Título</label>
              <input
                type="text"
                name="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Título de la Encuesta"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Survey Description */}
            <div className="mb-6">
              <label className="block text-gray-600 mb-2">Descripción</label>
              <input
                type="text"
                name="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descripción de la Encuesta"
                className="w-full border border-gray-300 rounded-lg p-3"
              />
            </div>

            {/* Questions Section */}
            <AccordionList
              accordions={accordions}
              handleExpansion={handleExpansion}
              handleInputChange={handleInputChange}
              handleTypeChange={handleTypeChange}
              addAccordion={addAccordion}
              removeAccordion={removeAccordion}
            />

            <div className='pt-10'>
              <Button type="submit" variant="contained" color="success" sx={{ marginTop: 2 }}>
                {isEditable ? 'Editar encuesta' : 'Crear encuesta'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSurveyForm;