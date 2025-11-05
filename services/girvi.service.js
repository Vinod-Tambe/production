const Girvi = require('../models/girvi.model');
const { formatDate } = require('./date.service');
const { create_stock, get_all_stock } = require('./stock.service');

// Add a new Girvi
const create_girvi_record = async (girviData) => {
  try {
    const girvi = new Girvi(girviData);
    const savedGirvi = await girvi.save();

    if (girviData.girv_type === 'secured' && girviData.stock_details) {
      let stockDetails = girviData.stock_details;

      if (Array.isArray(stockDetails)) {
        stockDetails = stockDetails.map(stock => ({
          ...stock,
          st_referance_id: savedGirvi.girv_id,
          st_referance_panel: "girvi",
          st_own_id: savedGirvi.girv_own_id,
        }));
      } else {
        stockDetails.st_referance_id = savedGirvi.girv_id;
        stockDetails.st_referance_panel = "girvi";
        stockDetails.st_own_id = savedGirvi.girv_own_id;
      }
      const stock_data = await create_stock(stockDetails);
      savedGirvi.stock_data = stock_data;

      return {
        girvi_details: savedGirvi,
        stock_details: stock_data
      };
    }

    // Step 3: If not secured, return only girvi
    return savedGirvi;

  } catch (error) {
    throw new Error(`Failed to add Girvi: ${error.message}`);
  }
};



// Update an existing Girvi by ID
const update_girvi_record = async (id, updateData) => {
  try {
    const girvi = await Girvi.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!girvi) {
      throw new Error('Girvi not found');
    }
    return await girvi.populate([
      'girv_firm_id',
      'girv_own_id',
      'girv_user_id',
      'girv_staff_id',
      'girv_first_int_cr_acc_id',
      'girv_first_int_dr_acc_id',
      'girv_cash_acc_id',
      'girv_bank_acc_id',
      'girv_online_acc_id',
      'girv_card_acc_id',
      'girv_dr_acc_id'
    ]);
  } catch (error) {
    throw new Error(`Failed to update Girvi: ${error.message}`);
  }
}

// Remove a Girvi by ID
const remove_girvi_record = async (id) => {
  try {
    const girvi = await Girvi.findByIdAndDelete(id);
    if (!girvi) {
      throw new Error('Girvi not found');
    }
    return { message: 'Girvi removed successfully' };
  } catch (error) {
    throw new Error(`Failed to remove Girvi: ${error.message}`);
  }
}

// Get a Girvi by ID
const get_girvi_record_details = async (girv_id) => {
  try {
    const girvi = await Girvi.findOne({ girv_id })
      .select(`
    -girv_first_int_cr_acc_id
    -girv_first_int_dr_acc_id
    -girv_cash_amt
    -girv_bank_amt
    -girv_online_amt
    -girv_card_amt
    -girv_cash_acc_id
    -girv_bank_acc_id
    -girv_online_acc_id
    -girv_card_acc_id
    -girv_cash_info
    -girv_bank_info
    -girv_online_info
    -girv_card_info
    -girv_dr_acc_id
    -girv_other_info
    -girv_pay_info
    -girv_add_date
    -createdAt
    -updatedAt
    -__v
    -_id
  `)
      .populate([
        { path: 'girv_firm_id' },
        { path: 'girv_own_id' },
        { path: 'girv_user_id' },
        { path: 'girv_staff_id' },
        { path: 'girv_first_int_cr_acc_id' },
        { path: 'girv_first_int_dr_acc_id' },
        { path: 'girv_cash_acc_id' },
        { path: 'girv_bank_acc_id' },
        { path: 'girv_online_acc_id' },
        { path: 'girv_card_acc_id' },
        { path: 'girv_dr_acc_id' }
      ]);
    if (!girvi) {
      throw new Error('Girvi not found');
    }
    const response = { girvi_details: girvi.toObject() };
    // start calculation and store calculation in response
    const girvi_cal = await get_interest_difference(girvi.girv_prin_amt, girvi.girv_start_date, girvi.girv_roi, girvi.girv_roi_type);
    response.girvi_details.girv_int_amt = girvi_cal.interest;
    response.girvi_details.girv_time_period = girvi_cal.formatted;
    response.girvi_details.girv_start_date = girvi_cal.startDate;
    response.girvi_details.girv_end_date = girvi_cal.endDate;
    // end calculation and store calculation in response
    let girv_total_stock_amt = 0;

if (girvi.girv_type === 'secured') {
  const stock_details = await get_all_stock({ st_referance_id: girv_id });
  
  // 🧮 Calculate total st_final_valuation
  if (Array.isArray(stock_details) && stock_details.length > 0) {
    girv_total_stock_amt = stock_details.reduce(
      (sum, stock) => sum + (stock.st_final_valuation || 0),
      0
    );
  }

  response.stock_details = stock_details;
}


        //Final Calculation
    const girv_total_prin_amt = girvi.girv_prin_amt;
    const girv_total_int_amt = girvi_cal.interest;
    const girv_total_amt = girv_total_prin_amt + girv_total_int_amt;

    const final_detail = {
      girv_total_prin_amt,
      girv_total_int_amt,
      girv_total_amt,
      girv_total_stock_amt,
      girv_total_profit_loss_amt:girv_total_stock_amt-girv_total_amt
    };

    response.final_detail = final_detail;
    //Final Calculation

    return response;
  } catch (error) {
    throw new Error(`Failed to get Girvi: ${error.message}`);
  }
}

// List all Girvi records
const get_all_girvi_record = async () => {
  try {
    return await Girvi.find().populate([
      'girv_firm_id',
      'girv_own_id',
      'girv_user_id',
      'girv_staff_id',
      'girv_first_int_cr_acc_id',
      'girv_first_int_dr_acc_id',
      'girv_cash_acc_id',
      'girv_bank_acc_id',
      'girv_online_acc_id',
      'girv_card_acc_id',
      'girv_dr_acc_id'
    ]);
  } catch (error) {
    throw new Error(`Failed to list all Girvi: ${error.message}`);
  }
}

const get_interest_difference = (principal, inputDateStr, int_rate, rateType) => {  //rate (interest rate)
  const inputDate = new Date(inputDateStr);
  const today = new Date(); // ✅ Use current date

  // Total day difference
  const diffTime = today - inputDate;
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  // Year, month, day calculation
  let years = today.getFullYear() - inputDate.getFullYear();
  let months = today.getMonth() - inputDate.getMonth();
  let days = today.getDate() - inputDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // 🧮 Interest Calculation
  let interest = 0;
  switch (rateType.toLowerCase()) {
    case "daily":
      interest = (principal * int_rate * totalDays) / 100;
      break;
    case "monthly":
      interest = (principal * int_rate * (months + days / 30)) / 100;
      break;
    case "yearly":
      const totalYears = years + months / 12 + days / 365;
      interest = (principal * int_rate * totalYears) / 100;
      break;
    default:
      throw new Error("Invalid int_rate type! Use 'daily', 'monthly', or 'yearly'.");
  }

  // 🧾 Round off interest and total
  const roundedInterest = Math.round(interest);
  const totalAmount = Math.round(principal + roundedInterest);

  // Return final object
  return {
    startDate: formatDate(inputDate),
    endDate: formatDate(new Date(Date.now())),
    years,
    months,
    days,
    totalDays,
    principal,
    int_rate,
    rateType,
    interest: roundedInterest,
    totalAmount,
    formatted: `${years ? `${years} Year${years > 1 ? "s" : ""} ` : ""}${months ? `${months} Month${months > 1 ? "s" : ""} ` : ""}${days ? `${days} Day${days > 1 ? "s" : ""} ` : ""}(${totalDays} Days)`
  };
};

module.exports = {
  create_girvi_record,
  update_girvi_record,
  remove_girvi_record,
  get_girvi_record_details,
  get_all_girvi_record
};