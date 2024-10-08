import { useFormContext } from 'react-hook-form';

const SurveyDescriptionInput = () => {
    const { register } = useFormContext();

    return (
        <div>
            <label className="block text-gray-600 mb-2">Descripción</label>
            <textarea
                placeholder="Descripción de la Encuesta"
                className="w-full border border-gray-300 rounded-lg p-3"
                {...register('description')}
            />
        </div>
    );
}

export default SurveyDescriptionInput;