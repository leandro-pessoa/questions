import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { vars } from '@/styles/vars'
import { selectToken } from '@/app/reducers/user'
import { toast } from 'react-toastify'
import { useState } from 'react'

import Button from '../Button'
import { StyledDiv } from './styles'
import { Trash2, Pencil, RotateCcw, Search, Plus } from 'lucide-react'
import { Loading } from '../Loading'
import FiltersSelect from '../Filters/FiltersSelect'
import { CenterContainer } from '../CenterContainer'
import { Title } from '../Title'
import Pagination from '../Pagination'
import Form from '../Form'

import type { FetchUrl } from '@/types/FetchUrl'
import Input from '../Input'

interface CrudProps<T> {
	data: { _id: string }[]
	labels: string[]
	localLoading: boolean
	dataStatus: 'idle' | 'succeeded' | 'pending' | 'failed'
	fetchFunc: FetchUrl<T>
	totalPages: number
	actualPage: number
	limit: number
	editFunc: (value: T) => void
	removeFunc: (value: T) => void
	addFunc: () => void
	searchUrl: string
}

const Crud = <T,>({
	data,
	labels,
	dataStatus,
	fetchFunc,
	totalPages,
	actualPage,
	editFunc,
	removeFunc,
	addFunc,
	searchUrl
}: CrudProps<T>) => {
	const dispatch = useAppDispatch()

	const token = useAppSelector(selectToken)
	const [searchColumn, setSearchColumn] = useState<string>('')
	const [searchLimit, setSearchLimit] = useState<number>(10)
	const [searchValue, setSearchValue] = useState<string>('')

	const search = {
		searchUrl,
		searchValue,
		column: searchColumn
	}

	const searchHandle = () => {
		if (searchValue === '') {
			toast.error('Insira um valor de pesquisa')
			return
		}

		if (!searchColumn) {
			toast.error('Insira a coluna de pesquisa')
			return
		}

		dispatch(fetchFunc({
			search,
			limit: Number(searchLimit),
			token
		}))
	}

	const renderData = () => {
		switch (dataStatus) {
			case 'pending':
				return (
					<CenterContainer $height='header'>
						<Loading>
							<div></div>
						</Loading>
					</CenterContainer>
				)
			case 'succeeded':
				return data.length === 0 ? (
					<Title
						style={{
							borderBottom: `2px solid ${vars.colors.blue}`,
						}}
					>
						Nenhum dado foi encontrado
					</Title>
				) : (
					<StyledDiv>
						<Form className='filters_wrapper' onSubmit={searchHandle}>
							<FiltersSelect
								title='Quantidade'
								defaultContent={['5', '10', '15', '20', '30']}
								className='filters_wrapper__select-quantity'
								setExternalSelectedValue={setSearchLimit}
							/>
							<div className='filters_wrapper__search'>
								<FiltersSelect
									title='Coluna'
									defaultContent={Object.keys(data[0])}
									noLabels={true}
									className='filters_wrapper__select-column'
									setExternalSelectedValue={setSearchColumn}
								/>
								<Input
									className='filters_wrapper__search-input'
									placeholder='Pesquisar'
									style={{ padding: '10px 16px' }}
									onChange={(e) => setSearchValue(e.target.value)}
									value={searchValue}
								/>
								<Button type='submit'>
									<Search />
								</Button>
							</div>
						</Form>
						<div className='responsive_table'>
							<table>
								<thead>
									<tr>
										<th>Ações</th>
										{/* titulos da tabela, com base na prop labels */}
										{labels.map((value: string) => {
											return <th key={value}>{value}</th>
										})}
									</tr>
								</thead>
								<tbody>
									{/* irá exibir os dados obtidos do server */}
									{data.map((value) => {
										// transforma o objeto em um array em que cada elemento é um array contendo o par chave/valor (ex: [['nome', 'leandro']])
										const entries = Object.entries(value)
										return (
											<tr key={value._id}>
												<td
													style={{
														display: 'flex',
														gap: '4px',
														borderBottom: 'none',
													}}
												>
													<Button
														iconButton
														onClick={()=>editFunc({ ...value } as T)}
													>
														<Pencil />
													</Button>
													<Button
														iconButton
														onClick={()=>removeFunc({ ...value } as T)}
													>
														<Trash2 />
													</Button>
												</td>
												{entries.map((entry, index) => {
													// caso o valor seja um array, retorna a length dele
													// caso não, retorna o valor
													const isArray =
														Array.isArray(entry[1])
															? entry[1].length
															: entry[1]
													return (
														<td
															key={index}
															title={String(isArray)}
														>
															{isArray}
														</td>
													)
												})}
											</tr>
										)
									})}
								</tbody>
							</table>
						</div>
						<div className='crud_footer'>
							<div style={{width: '25%'}}>
								<Button icon={<Plus/>} onClick={addFunc}>
									Adicionar
								</Button>
							</div>
							<Pagination
								actualPage={actualPage}
								limit={searchLimit}
								totalPages={totalPages}
								fetchFunc={fetchFunc}
								search={search}
							/>
							<div className='crud_footer__blank-div'></div>
						</div>
					</StyledDiv>
				)
			case 'failed':
				return (
					<CenterContainer $height='header'>
						<h2>Falha ao tentar carregar os dados</h2>
						<br />
						<Button onClick={() => dispatch(fetchFunc({ token }))}>
							<RotateCcw />
							Recarregar
						</Button>
					</CenterContainer>
				)
		}
	}

	return renderData()
}

export default Crud
