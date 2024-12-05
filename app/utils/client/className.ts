import { patterns } from '~/utils/client/TailwindCssParser';

type PropertyClassMap = {
    [property: string]: {
        classes: string[];
        default: string;
    };
};

const propertyClassMap: PropertyClassMap = {
    fontFamily: {
        classes: [
            'font-sans',
            'font-serif',
            'font-mono',
            'font-display',
            'font-handwriting',
        ],
        default: 'font-sans',
    },
    textAlign: {
        classes: ['text-left', 'text-center', 'text-right', 'text-justify'],
        default: 'text-left',
    },
    // Add more properties and their Tailwind CSS classes here
    fontSize: {
        classes: [
            'text-xs',
            'text-sm',
            'text-base',
            'text-lg',
            'text-xl',
            'text-2xl',
            'text-3xl',
            'text-4xl',
            'text-5xl',
            'text-6xl',
            'text-7xl',
            'text-8xl',
            'text-9xl',
        ],
        default: 'text-base',
    },
    fontWeight: {
        classes: [
            'font-thin',
            'font-extralight',
            'font-light',
            'font-normal',
            'font-medium',
            'font-semibold',
            'font-bold',
            'font-extrabold',
            'font-black',
        ],
        default: 'font-normal',
    },
    display: {
        classes: ['inline-flex', 'flex', 'block', 'inline-block'],
        default: 'inline-flex',
    },
    alignItems: {
        classes: [
            'items-start',
            'items-center',
            'items-end',
            'items-baseline',
            'items-stretch',
        ],
        default: 'items-center',
    },
    justifyContent: {
        classes: [
            'justify-start',
            'justify-center',
            'justify-end',
            'justify-between',
            'justify-around',
            'justify-evenly',
        ],
        default: 'justify-start',
    },
    borderRadius: {
        classes: [
            'rounded-none',
            'rounded-sm',
            'rounded',
            'rounded-md',
            'rounded-lg',
            'rounded-full',
            'rounded-xl',
            'rounded-2xl',
            'rounded-3xl',
        ],
        default: 'rounded-md',
    },
    backgroundColor: {
        classes: [], // We'll handle these with regex patterns
        default: 'bg-white',
    },
    paddingX: {
        classes: [
            'px-0',
            'px-1',
            'px-2',
            'px-3',
            'px-4',
            'px-5',
            'px-6',
            'px-8',
            'px-10',
            'px-12',
        ],
        default: 'px-3',
    },
    paddingY: {
        classes: [
            'py-0',
            'py-1',
            'py-2',
            'py-3',
            'py-4',
            'py-5',
            'py-6',
            'py-8',
            'py-10',
            'py-12',
        ],
        default: 'py-2',
    },
    textColor: {
        classes: [], // Handled with regex
        default: 'text-gray-900',
    },
    shadow: {
        classes: [
            'shadow',
            'shadow-sm',
            'shadow-md',
            'shadow-lg',
            'shadow-xl',
            'shadow-2xl',
            'shadow-inner',
            'shadow-none',
        ],
        default: 'shadow-sm',
    },
    ringWidth: {
        classes: ['ring-0', 'ring-1', 'ring-2', 'ring-4', 'ring-8'],
        default: 'ring-1',
    },
    ringColor: {
        classes: [], // Handled with regex
        default: 'ring-gray-300',
    },
    ringInset: {
        classes: ['ring-inset'],
        default: 'ring-inset',
    },
    hoverBackgroundColor: {
        classes: [], // Handled with regex
        default: 'hover:bg-gray-50',
    },
    // Add other properties as needed
};

const classToPropertyMap: { [className: string]: string } = Object.entries(
    propertyClassMap,
).reduce(
    (acc, [property, { classes }]) => {
        classes.forEach(cls => (acc[cls] = property));
        return acc;
    },
    {} as { [className: string]: string },
);

for (const property in propertyClassMap) {
    const classes = propertyClassMap[property].classes;
    for (const cls of classes) {
        classToPropertyMap[cls] = property;
    }
}

export function updateClassName(
    defaultClass: string,
    settingsClassName?: string,
): string {
    const classSet = new Set<string>(defaultClass.split(' '));
    const settingsSet = new Set<string>(settingsClassName?.split(' ') || []);

    const propertyToClass: { [property: string]: string } = {};

    [...settingsSet, ...classSet].forEach(cls => {
        let property =
            classToPropertyMap[cls] ||
            Object.keys(patterns).find(prop => patterns[prop].test(cls));

        if (property) {
            propertyToClass[property] = cls;
        } else {
            propertyToClass[cls] = cls;
        }
    });

    return Object.values(propertyToClass).join(' ').trim();
}

export function changeClassInString(
    className: string,
    property: string,
    newValue: string,
    ignoreSameValue = false,
): string {
    const pattern = patterns[property] as RegExp;

    if (!pattern) {
        console.error('Property not recognized:', property);
        return className;
    }

    const classList = className.split(' ');

    const updatedClassList = classList.filter(cls => !pattern.test(cls));

    if (ignoreSameValue) {
        updatedClassList.push(newValue);
    } else if (!updatedClassList.includes(newValue)) {
        updatedClassList.push(newValue);
    }

    return updatedClassList.join(' ').trim();
}
