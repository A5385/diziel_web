export const formatPhone = (phone: string) => {
    if (phone) {
        const match = phone.match(/^\+?(\d{1})(\d{3})(\d{4})(\d{4})$/);
        if (!match) return phone;
        const [, country, carrier, part1, part2] = match;
        return `(+${country}) ${carrier} ${part1} ${part2}`;
    } else return '-';
};
