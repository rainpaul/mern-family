import {FormRow, FormRowSelect} from './index'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/SearchContainer'

const SearchContainer = () => {
    const {
        isLoading,
        search,
        sort,
        sortOptions,
        handleChange,
        clearFilter
    } = useAppContext()

    const handleSearch= (e) => {
        if(isLoading) return
        handleChange({name:e.target.name,value:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        clearFilter()
    }

    return(
        <Wrapper>
            <form className='form'>
                <h4>search form</h4>
                <div className='form-center'>
                    <FormRow
                        type='text'
                        name='search'
                        value={search}
                        handleChange={handleSearch}
                    ></FormRow>
                    <FormRowSelect
                        name='sort'
                        value={sort}
                        handleChange={handleSearch}
                        list={sortOptions}
                    ></FormRowSelect>
                    <button
                        className='btn btn-block btn-danger'
                        disabled={isLoading}
                        onClick={handleSubmit}
                    >
                        clear filter
                    </button>
                </div>
            </form>
        </Wrapper>
    )
}

export default SearchContainer