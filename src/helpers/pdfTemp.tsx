interface PDfTemplateProps<T extends object> {
    data: T[];
    title: string;
}

export const PdfTemplate = <T extends object>({ data, title }: PDfTemplateProps<T>) => {
    if (!Array.isArray(data)) return null;

    const headers = data.length > 0 ? Object.keys(data[0] ?? {}) : [];

    return (
        <div id='pdfContent' className='bg-gray-100 p-5'>
            <h1 className='mb-4 text-center text-2xl font-bold'>{title}</h1>
            <table className='w-full border-collapse'>
                <thead>
                    <tr className='bg-blue-500 text-white'>
                        {headers.map((key, index) => (
                            <th key={index} className='border p-2 text-left'>
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr
                            key={index}
                            className={`border ${index % 2 === 0 ? 'bg-gray-200' : 'bg-white'}`}
                        >
                            {Object.values(item).map((value, valueIndex) => (
                                <td key={valueIndex} className='border p-2'>
                                    {String(value)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
