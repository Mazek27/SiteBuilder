import { Page } from '~/models/Page';
import { FC } from 'react';
import { Field } from '~/components/Forms/Field';
import { useForm } from 'react-hook-form';
import { useEditMode } from '~/hooks/useEditMode';

type OwnProps = {
    pages: Page[];
};

export const PagesDesktop: FC<OwnProps> = props => {
    const { pages } = props;
    const { isEditing } = useEditMode();
    return (
        <div className="hidden lg:flex lg:gap-x-12">
            {pages.map(PageButton)}
            {isEditing && <PageAddButton />}
        </div>
    );
};

const PageButton = (page: Page) => {
    return (
        <a
            href={`${page.path}`}
            className="text-sm font-semibold leading-6 text-gray-900">
            {page.title}
        </a>
    );
};

const PageAddButton = () => {
    // const {} = useTooltip()

    return (
        <>
            <a
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900">
                Add Page
                <span aria-hidden="true">&rarr;</span>
            </a>
        </>
    );
};

type FormProps = {
    changeValue: (property: string, value: string | number | boolean) => void;
};

export const PageForm = (props: FormProps) => {
    const { register, formState } = useForm();

    return (
        <>
            <Field id={'name'} value={''} {...register('name')} />
            <Field id={'path'} value={''} {...register('path')} />
        </>
    );
};
