interface Props {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    children: React.ReactNode;
    required?: boolean;
}

export default function Select({
    label,
    name,
    value,
    onChange,
    children,
    required = false }
    : Props) {

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <label style={{ fontSize: "14px", color: "#555" }}>{label}</label>
            <select
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ddd",
                    color: "#333",
                    background: "#f9f9f9",
                    fontSize: "16px",
                    cursor: "pointer",
                    appearance: "none", // Remove o estilo padrão do navegador
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 10px center",
                    backgroundSize: "16px",
                    paddingRight: "36px" // Espaço para a seta
                }}
            >
                {children}
            </select>
        </div>
    );
}