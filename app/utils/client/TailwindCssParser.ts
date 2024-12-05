export const patterns: Record<string, RegExp> = {
    textAlign: /^(text-(left|center|right|justify))$/,
    textDecoration: /^(underline|line-through|no-underline)$/,
    fontSize: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
    fontStyle: /^(italic|not-italic)$/,
    fontFamily: /^(font-(sans|serif|mono|display|handwriting))$/,
    fontWeight:
        /^(font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black))$/,
    // Button-specific patterns
    display: /^(inline-flex|flex|block|grid|inline-block)$/,
    gridTemplateColumns: /^(grid-cols-(\d+|auto|1|2|3|4|5|6|7|8|9|10|11|12))$/,
    gridGap: /^(gap-(\d+))$/,
    gridAutoFlow: /^(grid-flow-(row|col|row-dense|col-dense))$/,
    gridAutoColumns: /^(auto-cols-(auto|fr|max|min|prose|none))$/,
    gridAutoRows: /^(auto-rows-(auto|fr|max|min|prose|none))$/,
    gridRow: /^(row-(auto|span-\d+|start|end|span-(\d+|full)))$/,
    gridColumn: /^(col-(auto|span-\d+|start|end|span-(\d+|full)))$/,
    gridTemplateRows: /^(grid-rows-(auto|fr|max|min|prose|none))$/,
    gridTemplateAreas: /^grid-template-areas\((.+)\)$/,
    gap: /^gap-(\d+)$/,
    justifyContent: /^(justify-(start|center|end|between|around|evenly))$/,
    flexDirection: /^(flex-(row|row-reverse|col|col-reverse))$/,
    flexWrap: /^(flex-wrap|flex-no-wrap|flex-nowrap)$/,
    flexGrow: /^flex-grow-(\d+(\.\d+)?)$/,
    flexShrink: /^flex-shrink-(\d+(\.\d+)?)$/,
    alignItems: /^items-(start|center|end|baseline|stretch)$/,
    borderRadius: /^rounded(-(none|sm|md|lg|xl|2xl|3xl|full))?$/,
    backgroundColor: /^bg-(.+)$/,
    paddingX: /^px-(\d+)$/,
    paddingY: /^py-(\d+)$/,
    textColor: /^text-(.+)$/,
    shadow: /^shadow(-(sm|md|lg|xl|2xl|inner|none))?$/,
    ringWidth: /^ring-(0|1|2|4|8)$/,
    ringColor: /^ring-(.+)$/,
    ringInset: /^(ring-inset)$/,
    hoverBackgroundColor: /^hover:bg-(.+)$/,
    // Handle responsive classes
    responsive: /^(\w+):(.+)$/,
    // Add more patterns as needed
};

export const parseTailwindClassName = (className: string) => {
    const classes = className.split(' ');
    const result: { [key: string]: string } = {};

    classes.forEach(cls => {
        // Check for text alignment classes
        if (patterns.textAlign.test(cls)) {
            result['textAlign'] = cls;
            return;
        }

        // Check for font size classes
        if (patterns.fontSize.test(cls)) {
            result['fontSize'] = cls;
            return;
        }

        // Check for font weight classes
        if (patterns.fontWeight.test(cls)) {
            result['fontWeight'] = cls;
            return;
        }

        // Check for text color classes
        if (patterns.textColor.test(cls)) {
            result['textColor'] = cls;
            return;
        }

        // Handle responsive classes (like sm:text-6xl)
        const responsiveMatch = cls.match(patterns.responsive);
        if (responsiveMatch) {
            const prefix = responsiveMatch[1]; // e.g., 'sm', 'md', 'lg'
            const utilityClass = responsiveMatch[2];
            if (!result[prefix]) {
                result[prefix] = {};
            }
            // Recursively parse the utility class
            const parsedUtility = parseTailwindClassName(utilityClass);
            result[prefix] = { ...result[prefix], ...parsedUtility };
            return;
        }

        // You can add additional parsing for other utility classes here
    });

    return result;
};
