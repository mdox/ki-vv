import { useQuery } from "@tanstack/react-query";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { apiUrl } from "./consts";

export default function App() {
	return (
		<div className="flex flex-col gap-2">
			<header className="max-w-screen-lg w-full mx-auto">
				<span className="text-2xl leading-loose">
					{"Online Valutaváltó"}
				</span>
			</header>

			<main className="max-w-screen-lg w-full mx-auto">
				<div className="flex flex-col gap-2">
					<ConvertForm></ConvertForm>
				</div>
			</main>
		</div>
	);
}

function ConvertForm() {
	const { data: symbols = [] } = useQuery({
		queryKey: ["symbols"],
		queryFn: () =>
			fetch(`${apiUrl}/api/symbols`)
				.then((response) => response.json())
				.then((results) => results),
	});

	return (
		<form className="flex flex-col gap-2">
			<div className="grid grid-cols-3 gap-2">
				<div>
					<div className="mb-2 block">
						<Label htmlFor="amount" value="Összeg" />
					</div>
					<TextInput
						id="amount"
						type="number"
						required={true}
					></TextInput>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="from" value="Erről a valutáról" />
					</div>
					<Select id="from" required={true}>
						{symbols.map((symbol: string) => (
							<option key={symbol} value={symbol}>
								{symbol}
							</option>
						))}
					</Select>
				</div>
				<div>
					<div className="mb-2 block">
						<Label htmlFor="to" value="Erre a valutára" />
					</div>
					<Select id="to" required={true}></Select>
				</div>
			</div>

			<Button type="submit">Mehet</Button>
		</form>
	);
}
