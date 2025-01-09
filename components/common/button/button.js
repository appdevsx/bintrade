export default function Button(props) {
    const variants = {
        default: 'bg--base block text-white font-semibold rounded-md transition-all hover:bg-blue-700',
        outline: 'border border-gray-300 rounded-md hover:bg-gray-300',
        ghost: 'rounded-md bg-white hover:bg-gray-200'
    }
    const sizes = {
        xs: 'text-xs px-2 py-1',
        sm: 'text-sm px-3 py-1.5',
        base: 'text-base px-4 py-2',
        lg: 'text-lg px-4 py-2'
    }
    return (
        <button {...props} className={`${props.variant ? variants[props.variant] : variants['default']} ${props.size ? sizes[props.size] : sizes['base']}`}></button>
    )
}