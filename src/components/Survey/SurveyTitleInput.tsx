import { useFormContext } from 'react-hook-form';

const SurveyTitleInput = () => {
    const { register } = useFormContext();

    return (
        <div>
            <label className="block text-gray-600 mb-2">Título</label>
            <input
                type="text"
                placeholder="Título de la Encuesta"
                className="w-full border border-gray-300 rounded-lg p-3"
                {...register('title')}
            />
        </div>
    );
}

export default SurveyTitleInput;