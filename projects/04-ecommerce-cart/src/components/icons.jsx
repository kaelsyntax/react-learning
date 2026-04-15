const IconBase = ({ children, size = 20, strokeWidth = 1.9, ...props }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        focusable="false"
        {...props}
    >
        {children}
    </svg>
)

export function CartIcon(props) {
    return (
        <IconBase {...props}>
            <circle cx="9" cy="20" r="1.25" />
            <circle cx="18" cy="20" r="1.25" />
            <path d="M2 3h3l2.2 10.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.5l1.3-6.6H6.1" />
        </IconBase>
    )
}

export function CartAddIcon(props) {
    return (
        <IconBase {...props}>
            <circle cx="9" cy="20" r="1.25" />
            <circle cx="18" cy="20" r="1.25" />

            <path d="M2 3h3l2.2 10.2a2 2 0 0 0 2 1.6h8.9a2 2 0 0 0 2-1.5l1.3-6.6H6.1" />

            <g>
                <circle
                    cx="19"
                    cy="4.8"
                    r="4"
                    fill="#0f3d88"
                    stroke="#dbeafe"
                    strokeWidth="1"
                />
                <path
                    d="M19 3.2v3.6M17.2 5h3.6"
                    stroke="#dbeafe"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </g>
        </IconBase>
    )
}

export function CloseIcon(props) {
    return (
        <IconBase {...props}>
            <path d="M6 6l12 12" />
            <path d="M18 6l-12 12" />
        </IconBase>
    )
}

export function AddIcon(props) {
    return (
        <IconBase {...props}>
            <path d="M12 5v14" />
            <path d="M5 12h14" />
        </IconBase>
    )
}

export function RemoveIcon(props) {
    return (
        <IconBase {...props}>
            <path d="M5 12h14" />
        </IconBase>
    )
}

export function TrashIcon(props) {
    return (
        <IconBase strokeWidth={2.15} {...props}>
            <path d="M4.5 7h15" />
            <path d="M9 4.7h6" />
            <path d="M8.2 7l0.7 11.2a1 1 0 0 0 1 0.9h4.2a1 1 0 0 0 1-0.9L15.8 7" />
            <path d="M10.2 10.2v5.6" />
            <path d="M13.8 10.2v5.6" />
        </IconBase>
    )
}

export function FilterIcon(props) {
    return (
        <IconBase {...props}>
            <path d="M4 6h16" />
            <path d="M7 12h10" />
            <path d="M10 18h4" />
        </IconBase>
    )
}
