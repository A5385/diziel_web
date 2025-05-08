import * as RPNInput from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
    const Flag = flags[country];

    return <> {Flag && <Flag title={countryName} />}</>;
};

export default FlagComponent;
