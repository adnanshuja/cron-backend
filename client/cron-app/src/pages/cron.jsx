import Navbar from '../components/navbar';

function CronPage() {
  return (
    <div className="main-wrapp">
      <Navbar />
      <div className="content-wrap">
        <section className="section-space">
          <div className="heading-title text-left">
            <h2>Cron Jobs</h2>
          </div>
          <div className="table-wrapper">
            <table className="responsive-table">
              <thead className="responsive-table__head">
                <tr className="responsive-table__row">
                  <th className="responsive-table__head__title responsive-table__head__title--name">
                    User Name
                  </th>
                  <th className="responsive-table__head__title responsive-table__head__title--email">
                    Email
                  </th>
                  <th className="responsive-table__head__title responsive-table__head__title--role">
                    Role
                  </th>
                  <th className="responsive-table__head__title responsive-table__head__title--permission">
                    Permissions
                  </th>
                  <th className="responsive-table__head__title responsive-table__head__title--actions">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="responsive-table__body">
                <tr className="responsive-table__row">
                  <td className="responsive-table__body__text responsive-table__body__text--name">
                    Test Data
                  </td>
                  <td className="responsive-table__body__text responsive-table__body__text--email">
                    Test Data
                  </td>
                  <td className="responsive-table__body__text responsive-table__body__text--role">
                    Test Data
                  </td>
                  <td className="responsive-table__body__text responsive-table__body__text--permission">
                    Test Data
                  </td>
                  <td className="responsive-table__body__text responsive-table__body__text--actions">
                    <div className='buttn-tables'>
                    <a href="#" className='run-btn'>Run</a>
                    <a href="#" className='stop-btn'>Stop</a>
                    </div>
                  </td>
                </tr>
                <tr className="responsive-table__row">
                  <td className="responsive-table__body__text responsive-table__body__text--name">
                    Test Data
                  </td>
                  <td className="responsive-table__body__text responsive-table__body__text--email">
                    Test Data
                  </td>
                  <td className="responsive-table__body__text responsive-table__body__text--role">
                    Test Data
                  </td>
                  <td className="responsive-table__body__text responsive-table__body__text--permission">
                    Test Data
                  </td>
                </tr>
                <tr className="responsive-table__row">
                  <td className="responsive-table__body__text responsive-table__body__text--name">
                    Test Data
                  </td>
                  <td className="responsive-table__body__text responsive-table__body__text--email">
                    Test Data
                  </td>
                  <td className="responsive-table__body__text responsive-table__body__text--role">
                    Test Data
                  </td>
                  <td className="responsive-table__body__text responsive-table__body__text--permission">
                    Test Data
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <section className="section-space">
          <div className="heading-title text-left">
            <h2>Form Template</h2>
          </div>
          <div className="form_wrapper">
            <div className="maxwidth-600">
              <form>
                <div className="grid-row">
                  <div className="grid-6">
                    <div className="record-item">
                      <div className="input-field w-100">
                        <label className="">Email Address</label>
                        <input className="" type="email" placeholder=" " />
                      </div>
                    </div>
                  </div>
                  <div className="grid-6">
                    <div className="record-item">
                      <div className="input-field w-100">
                        <label className="">Email Address</label>
                        <input className="" type="email" placeholder=" " />
                      </div>
                    </div>
                  </div>
                  <div className="grid-12">
                    <div className="record-item">
                      <div className="input-field w-100">
                        <label className="">Email Address</label>
                        <textarea></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="">
                  <div className="text-center">
                    <input
                      type="submit"
                      className="theme-btn"
                      value={'Submit '}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CronPage;
