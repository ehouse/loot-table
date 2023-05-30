export function LevelSelect(props: { setLevel: (level: number) => void, levelSelect: number }) {
    return <div css={{ paddingTop: '16px' }}>
        <h3 css={{ fontSize: '20px', padding: '4px 0 4px 0' }}>Level Select</h3>
        <div css={{ display: 'flex', gap: '4px' }}>
            {Array.from({ length: 21 }, (_, i) => (i))
                .map((i) =>
                    <button
                        key={`Select ${i}`}
                        css={{
                            padding: '4px 8px'
                        }}
                        onClick={() => { props.setLevel(i) }}>
                        {i < 20 ? i : `${i}+`}
                    </button>
                )}
        </div>
    </div>
}
