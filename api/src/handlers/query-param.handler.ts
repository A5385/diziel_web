import { endOfDay, parse } from 'date-fns';
import { Request } from 'express';
import { PrismaService } from 'src/app/shared/services';

type OrderByType = Array<Record<string, 'asc' | 'desc'>>;

type PaginateResult = {
    limit: number;
    page: number;
    orderBy: OrderByType;
};

export type ExtractAllFromReqProps<T> = PaginateResult & {
    queries: Record<keyof T, string | undefined>;
    startDate: Date | undefined;
    endDate: Date | undefined;
};
export const extractValueFromRequest = (req: Request, key: string) => {
    const value = req.query[key] as string;
    if (value) {
        return value;
    }
};
export const ExtractAllFromReq = <T>(
    req: Request,
    queriesTarget: (keyof T)[],
): ExtractAllFromReqProps<T> => {
    const queries = queriesTarget.reduce(
        (acc, query) => {
            acc[query] = extractValueFromRequest(req, query.toString());
            return acc;
        },
        {} as Record<keyof T, string | undefined>,
    );

    const startDate = extractValueFromRequest(req, 'createFrom');
    const endDate = extractValueFromRequest(req, 'createTo');
    const { limit, page } = ExtractPaginateFromReq(req);
    const orderBy = ExtractSortByFromReq(req);

    return {
        queries,
        startDate: startDate ? convertToStartDate(startDate) : undefined,
        endDate: endDate ? convertToStartDate(endDate) : undefined,
        limit,
        page,
        orderBy,
    };
};

export const convertToStartDate = (dateSt: string): Date | undefined => {
    const parsedDate = parse(dateSt, 'dd/MM/yyyy', new Date());
    if (isNaN(parsedDate.getTime())) return undefined;

    return parsedDate;
};

export const convertToEndDate = (query: string): Date | undefined => {
    const extractedDate = convertToStartDate(query);
    if (extractedDate) {
        return endOfDay(extractedDate);
    }
};

export const ExtractSortByFromReq = (req: Request): OrderByType => {
    const sortByQuery = req.query.sortBy as string;

    if (!sortByQuery) {
        return [{ id: 'desc' }]; // Default sort order
    }

    return sortByQuery.split(',').map((sort) => {
        const [field, order] = sort.split(':');
        return { [field]: order === 'desc' ? 'desc' : 'asc' }; // Default to 'asc' if order is not provided
    });
};

export const ExtractPaginateFromReq = (req: Request): { limit: number; page: number } => {
    const limit = Math.max(Number(req.query.limit) || 10, 1); // Ensure limit is at least 1
    const page = Math.max(Number(req.query.page) || 1, 1); // Ensure page is at least 1
    return { limit, page };
};

type GenerateDataFilterResponseParams<
    TModel extends keyof PrismaService,
    TFindManyArgs extends object = object,
    TInclude extends object = object,
    TSelect extends object = object,
> = PaginateResult & {
    model: TModel;
    where: TFindManyArgs;
    prisma: PrismaService;
    include?: TInclude;
    select?: TSelect;
};

export const generateDataFilterResponse = async <
    TModel extends keyof PrismaService,
    TFindManyArgs extends object = object,
    TInclude extends object = object,
>({
    model,
    where,
    prisma,
    page = 1,
    limit = 10,
    orderBy,
    include,
    select,
}: GenerateDataFilterResponseParams<TModel, TFindManyArgs, TInclude>) => {
    const modelDelegate = prisma[model] as any; // still can't infer findMany dynamically in TS yet, it's fine in one place

    const data = await modelDelegate.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: orderBy ?? [{ createdAt: 'desc' }],
        ...(include && { include }),
        ...(select && { select }),
    });

    const total = await modelDelegate.count();
    const total_filtered = await modelDelegate.count({ where });

    return {
        page,
        limit,
        total,
        total_filtered,
        data,
    };
};
