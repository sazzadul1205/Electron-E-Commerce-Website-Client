
const Title = ({title, subtitle}) => {
    return (
        <div className="pt-20 text-center">
            <h2 className="text-5xl  text-blue-500 font-semibold">~ {title} ~</h2>
            <p className="text-lg text-center text-gray-600 pt-2">{subtitle}</p>
        </div>
    );
};

export default Title;